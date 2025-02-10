import cv2
import numpy as np
from skimage.filters import gabor
from skimage.measure import shannon_entropy
from skimage.feature import graycomatrix, graycoprops

def preprocess_and_extract_features(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Could not read image {image_path}")

    # Convert to grayscale
    grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Normalize pixel values to range [0, 1]
    normalized = grayscale / 255.0

    # Extract features
    features = {}

    # Statistical features
    features['mean'] = np.mean(normalized)
    features['std'] = np.std(normalized)
    features['min'] = np.min(normalized)
    features['max'] = np.max(normalized)

    # Histogram features
    hist, _ = np.histogram(normalized, bins=256, range=(0, 1))
    hist = hist / hist.sum()  # Normalize histogram
    for i, h in enumerate(hist):
        features[f'hist_bin_{i}'] = h

    # Haralick texture features
    glcm = graycomatrix((normalized * 255).astype(np.uint8), [1], [0, np.pi / 4, np.pi / 2, 3 * np.pi / 4], 256,
                        symmetric=True, normed=True)
    for prop in ['contrast', 'dissimilarity', 'homogeneity', 'energy', 'correlation', 'ASM']:
        features[f'glcm_{prop}'] = np.mean(graycoprops(glcm, prop))

    # Hu Moments
    moments = cv2.moments(normalized)
    hu_moments = cv2.HuMoments(moments).flatten()
    for i, hu in enumerate(hu_moments):
        features[f'hu_moment_{i}'] = hu

    # Shannon entropy
    features['entropy'] = shannon_entropy(normalized)

    # Gabor filter features
    for theta in (0, np.pi / 4, np.pi / 2, 3 * np.pi / 4):
        filt_real, filt_imag = gabor(normalized, frequency=0.6, theta=theta)
        features[f'gabor_mean_{theta}'] = filt_real.mean()
        features[f'gabor_std_{theta}'] = filt_real.std()

    return features