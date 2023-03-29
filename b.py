import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from sklearn.neighbors import NearestNeighbors


# Load ResNet50 model pre-trained on ImageNet dataset
model = tf.keras.applications.ResNet50(weights='imagenet', include_top=False, pooling='max')

# Load image dataset and extract features for each image
image_folder = 'images'
image_filenames = os.listdir(image_folder)
image_paths = [os.path.join(image_folder, fn) for fn in image_filenames]
image_features = []
for image_path in image_paths:
    img = image.load_img(image_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    features = model.predict(x)
    image_features.append(features.flatten())

# Create NearestNeighbors model for similarity search
nbrs = NearestNeighbors(n_neighbors=10, metric='euclidean').fit(image_features)

# Load query image and extract features
query_image_path = 'query_image.jpg'
query_image = cv2.imread(query_image_path)
query_image = cv2.cvtColor(query_image, cv2.COLOR_BGR2RGB)
query_image = cv2.resize(query_image, (224, 224))
query_image = preprocess_input(query_image)
query_features = model.predict(np.expand_dims(query_image, axis=0)).flatten()

# Use NearestNeighbors model to find similar images
distances, indices = nbrs.kneighbors([query_features])

# Display top 10 most similar images
similar_images = [cv2.imread(image_paths[i]) for i in indices[0]]
for image in similar_images:
    cv2.imshow('Similar Image', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Prompt user for relevance feedback and update search results
for i in range(3):
    print(f"Is image {i} relevant? (y/n)")
    response = input()
    if response == 'y':
        image_features.append(query_features)
        image_paths.append(query_image_path)
    elif response == 'n':
        pass

# Re-run similarity search with updated image features
nbrs = NearestNeighbors(n_neighbors=10, metric='euclidean').fit(image_features)
distances, indices = nbrs.kneighbors([query_features])

# Display updated top 10 most similar images
similar_images = [cv2.imread(image_paths[i]) for i in indices[0]]
for image in similar_images:
    cv2.imshow('Similar Image', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()