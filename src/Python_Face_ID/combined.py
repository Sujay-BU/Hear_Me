import tensorflow as tf
import numpy as np
import cv2
import os
import PIL.Image as Image
import matplotlib.pylab as plt
import tensorflow_hub as hub
import base64

from flask import Flask, request, jsonify
app = Flask(__name__)


data_dir = ".//Images"


import pathlib
data_dir = pathlib.Path(data_dir)
data_dir


types = '*/*.jpeg','*/*.jpg'
image_count = len(list(data_dir.glob('*/*.jpeg'))) + len(list(data_dir.glob('*/*.jpg')))
print(image_count)


images_dict = {
    'Me': list(data_dir.glob('Me/*')),
    'Not Me': list(data_dir.glob('Not Me/*'))
}


image_labels_dict = {
    'Me': 0,
    'Not Me': 1
}


x, y = [], []

for person_name, images in images_dict.items():
    for image in images:
        img = cv2.imread(str(image))
        resized_img = cv2.resize(img, (224,224))
        x.append(resized_img)
        y.append(image_labels_dict[person_name])


x = np.array(x);
y = np.array(y);


from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)


x_train = x_train/255
x_test = x_test/255


from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential
model = tf.keras.models.Sequential()


model.add(layers.Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)))
model.add(layers.MaxPooling2D((2,2)))
model.add(layers.Conv2D(64, (3,3), activation='relu', input_shape=(224,224,3)))
model.add(layers.MaxPooling2D((2,2)))
model.add(layers.Conv2D(64, (3,3), activation='relu', input_shape=(224,224,3)))

model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(2))


model.summary()


model.compile(
    optimizer='adam',
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy']
)


history = model.fit(x_train, y_train, epochs=5, validation_data=(x_test,y_test))


probability_model = tf.keras.Sequential([model, tf.keras.layers.Softmax()])
y_pred = np.argmax(probability_model.predict(x_test), axis=1)
print(y_pred)


fileIdx = 0
plt.imshow(x_test[fileIdx])

result = probability_model.predict(np.array([x_test[fileIdx]]))
result = np.argmax(result)
print(result)


class_names = ['Me', 'Not Me']
print(class_names[result])


@app.route('/json-example', methods=['POST'])
def json_example():
    req_data = request.get_json()
    image_recieved = req_data['imgsource']
    print(image_recieved)
    print('------------------------------------------------')

    decodedImage = base64.b64decode(image_recieved)

    f = open("imageToSave.jpeg", "wb")
    f.write(decodedImage)
    f.close()

    imagee = cv2.imread(r'.\imageToSave.jpeg')
    resized_imagee = cv2.resize(imagee, (224,224))
    new_imgg = np.array(resized_imagee)
    new_imgg = new_imgg/255

    result = probability_model.predict(np.array([new_imgg]))
    result = np.argmax(result)
    print(result)

    if result == 0:
        returnMessage = {
        'message': 'true'
        }
    elif result == 1:
        returnMessage = {
        'message': 'false'
        }

    return jsonify(returnMessage)

if __name__ == '__main__':
    app.run(host='192.168.0.147', port=30001)