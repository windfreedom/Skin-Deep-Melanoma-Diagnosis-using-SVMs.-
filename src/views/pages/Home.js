import React from 'react';
import SimplePage from '../components/SimplePage'

const home = [
  {
    "col": 12,
    "title": "SkinDeep: Accurate Automatic Melanoma Detection",
    "className": "TextCard MainCard",
    "body": [
      "Melanoma is the leading cause of cancer among young adults in America and is rapidly growing. It can develop from sunburns and even daily activity. Because it is easy to cure Melanoma in its early stage, screening is essential to preventative care.",
      "SkinDeep utilizes state-of-the-art Machine Learning and Computer Vision techniques to diagnose images of skin lesions as either benign growths or metastatic Melanoma.",
      "SkinDeep was created by three computer science students: Patrick Pan (Harvard, CS and Mind/Brain/Behavior), Evan Johnson (Northeastern, CS and Mathematics), and Ashwin Varma (Rice, CS and Biology). The project was conceived and implemented over the course of 36 hours at HackTech at Caltech."
    ],
    "buttons": [
      {
        "text": "Submit an Image",
        "link": ["submit"]
      },
      {
        "text": "More About SkinDeep",
        "link": ["about"]
      }
    ]
  }
]
const Home = () => SimplePage(home);


export default Home;
