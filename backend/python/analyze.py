import sys, time, re, math
import numpy as np
from functools import reduce
from skimage.segmentation import slic, mark_boundaries
from skimage.io import imread, imsave
from skimage.measure import regionprops
from skimage.util import crop
from skimage.transform import rescale
import skimage.measure as measure

#def preprocess(img):
#	return preprocessing.scale(img)

def imgAvg(img):
	return np.mean(img.flatten().reshape(-1, 3), axis=0)

def getEdges(img, width):
	return reduce(np.union1d, (img[width - 1], img[-width], img[:,width - 1], img[:,-width]))


img = imread(sys.argv[1])
#img = preprocess(img)
initSegments = 3

l = 1

while l == 1 :
	segments_slic = slic(img, n_segments=initSegments, compactness=25, sigma=3)
	edges = getEdges(segments_slic, 5)

	def rpl(target):
		return 1 if target not in edges else 0
	rpl_v = np.vectorize(rpl)

	segments_noedge = rpl_v(segments_slic)
	l = len(np.unique(segments_noedge))
	initSegments += 1

lesionprops = measure.regionprops(segments_noedge)[0]
bbox = lesionprops.bbox
lesionimg = img[bbox[0]:bbox[2], bbox[1]:bbox[3]]
lesionfilter = lesionprops.convex_image
strictfilter = lesionprops.image
lesionimg = (lesionimg * lesionfilter.reshape(lesionfilter.shape[0], lesionfilter.shape[1], 1))
strictimg = (lesionimg * strictfilter.reshape(strictfilter.shape[0], strictfilter.shape[1], 1))
hflip = np.fliplr(lesionimg)
vflip = np.flipud(lesionimg)
rot = np.flipud(hflip)
h_mse = np.mean(np.square(lesionimg-hflip))
v_mse = np.mean(np.square(lesionimg-vflip))
r_mse = np.mean(np.square(lesionimg-rot))
ellipseArea = lesionprops.major_axis_length * lesionprops.minor_axis_length * math.pi
area = lesionprops.area
lesionAvgColor = imgAvg(strictimg) * ((bbox[2]-bbox[0])*(bbox[3]-bbox[1])) / area
outsideArea = img.shape[0] * img.shape[1] - area
outsideAvgColor = (imgAvg(img) * outsideArea - area * lesionAvgColor) / outsideArea
lesionDeltaColor = outsideAvgColor - lesionAvgColor

print('%.2f,%.2f,%.2f,%.2f,%.4f,%.4f,%.4f,%.4f,%.4f,%.4f,%.4f,%.4f,%.4f' % (h_mse, v_mse, r_mse, math.pow(h_mse * v_mse * r_mse, 0.333333333), lesionprops.eccentricity, lesionprops.solidity, (ellipseArea-area) / ellipseArea, lesionAvgColor[0]/255, lesionAvgColor[1]/255, lesionAvgColor[2]/255, lesionDeltaColor[0]/255, lesionDeltaColor[1]/255, lesionDeltaColor[2]/255))
