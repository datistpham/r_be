import cv2
import numpy as np

# định nghĩa hàm RFIR
def RFIR(query_image, relevant_images):
    # chuyển đổi ảnh truy vấn sang không gian màu HSV
    hsv_query = cv2.cvtColor(query_image, cv2.COLOR_BGR2HSV)

    # tính histogram của ảnh truy vấn
    hist_query = cv2.calcHist([hsv_query], [0, 1], None, [180, 256], [0, 180, 0, 256])
    cv2.normalize(hist_query, hist_query, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)

    # tính toán histogram trung bình của các ảnh có liên quan
    hist_mean = np.zeros((180, 256))
    for img in relevant_images:
        hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        hist = cv2.calcHist([hsv_img], [0, 1], None, [180, 256], [0, 180, 0, 256])
        cv2.normalize(hist, hist, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
        hist_mean += hist
    hist_mean /= len(relevant_images)

    # tính histogram trung bình được cộng với ảnh truy vấn
    alpha = 0.5
    hist_combined = cv2.addWeighted(hist_query, alpha, hist_mean, 1 - alpha, 0)

    # tìm kiếm các ảnh tương tự dựa trên histogram kết hợp
    images = []
    for i in range(1, 11):
        filename = f'image_{i}.jpg' # tên file ảnh
        img = cv2.imread(filename)
        hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        hist = cv2.calcHist([hsv_img], [0, 1], None, [180, 256], [0, 180, 0, 256])
        cv2.normalize(hist, hist, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)

        # tính độ tương đồng giữa histogram kết hợp và histogram của ảnh đang xét
        similarity = cv2.compareHist(hist_combined, hist, cv2.HISTCMP_CORREL)

        # nếu độ tương đồng lớn hơn ngưỡng cho trước thì lưu lại ảnh
        if similarity > 0.75:
            images.append(img)

    return images

# ảnh truy vấn và các ảnh có liên quan
query_image = cv2.imread('query_image.jpg')
relevant_images = []
for i in range(1, 6):
    filename = f'relevant_image_{i}.jpg'
    img = cv2.imread(filename)
    relevant_images.append(img)

# tìm kiếm các ảnh tương tự
similar_images = RFIR(query_image, relevant_images)

# hiển thị các ảnh tìm được
for img in similar_images:
    cv2.imshow('Similar Image', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()