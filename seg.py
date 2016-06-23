import sys, time
import numpy as np
from functools import reduce
from skimage.segmentation import felzenszwalb, slic, quickshift, mark_boundaries
from skimage.io import imread, imsave

def getEdges(img, width):
	return reduce(np.union1d, (img[width - 1], img[-width], img[:,width - 1], img[:,-width]))
	

img = imread(sys.argv[1])

initSegments = 4

l = 1

while l == 1 :
	segments_slic = slic(img, n_segments=initSegments, compactness=20, sigma=3)
	edges = getEdges(segments_slic, 5)

	def rpl(target):
		return target if target not in edges else 0 
	rpl_v = np.vectorize(rpl)

	segments_noedge = rpl_v(segments_slic)
	l = len(np.unique(segments_noedge))
	initSegments += 2

#print("Slic number of segments: %d" % len(np.unique(segments_slic)))
#np.savetxt("/Users/patrick/Desktop/"+str(int(time.time())) + ".txt", segments_noedge, fmt='%i')



imsave("/Users/patrick/Desktop/"+str(time.time()) + ".jpg", mark_boundaries(img, segments_noedge))
#imsave("/Users/patrick/Desktop/"+str(time.time()) + ".jpg", mark_boundaries(img, segments_slic))
