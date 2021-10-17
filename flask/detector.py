import pandas
from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
import pickle

from nltk.corpus import stopwords 
import re
from nltk.tokenize import TweetTokenizer

import nltk
nltk.download('punkt')
nltk.download('stopwords')
import numpy as np

from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk



def predict_emotion(txt, model, model2):
    
    
    stemmer = nltk.stem.PorterStemmer()
    # getting stemmer

    ENGLISH_STOP_WORDS = stopwords.words('english')


    def my_tokenizer(sentence):

        sentence = nltk.word_tokenize(sentence) 

        listofwords=[word.lower() for word in sentence if word.isalpha()]

        listofstemmed_words = []

        # remove stopwords and any tokens that are just empty strings
        for word in listofwords:
            if (not word in ENGLISH_STOP_WORDS) and (word!=''):
                # Stem words
                stemmed_word = stemmer.stem(word)
                listofstemmed_words.append(stemmed_word)

        return listofstemmed_words


    
    sample_transformed = model2.transform(txt).toarray()
    prediction = model.predict(sample_transformed)
    prediction_probability = model.predict_proba(sample_transformed)
    print(f"Prediction: {prediction[0]}, Prediction Score: {np.max(prediction_probability)}")
    
    # gets a dictionary of {'class_name': probability}
    prob_per_class_dictionary = dict(zip(model.classes_, prediction_probability[0]))
    return prob_per_class_dictionary

