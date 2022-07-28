clc; clear; close all; warning off all;

%membaca citra rgb
Img = imread('flutter.png');
figure,imshow(Img);

%mengkonversi citra rgb menjadi grayscale
I = double(rgb2gray(Img));
figure, imshow(I,[]);

%konvolusi dengan operator roberts
robertshor = [0 1;-1 0];
robertsver = [1 0;0 -1];
lx = conv2(I, robertshor,'same');
ly = conv2(I, robertsver, 'same');
J = sqrt((lx.^2)+(ly.^2));

%menampilkan citra hasil konvolusi
figure,imshow(lx,[]);
figure,imshow(ly,[]);
figure,imshow(J,[]);

%melakukan thresholding citra
K = uint8(J);
L = im2bw(K,.08);
figure,imshow(L,[]);

%melakukan operasi morfologi
M = imfill(L,'holes');
N = bwareaopen(M, 10000);
figure, imshow(N,[]);

%mengambil bounding box masing-masing objek hasil segmentasi
[labeled,numObjects] = bwlabel(N,8);
stats = regionprops(labeled,'BoundingBox');
bbox = cat(1, stats.BoundingBox);

%menampilkan citra rgb hasil segmentasi
figure, imshow(Img);
hold on;
for idx=1:numObjects
    h = rectangle('Position',bbox(idx,:),'LineWidth',2);
    set(h,'EdgeColor',[.75 0 0]);
    hold on;
end

%menampilkan jumlah objek hasil segmentasi
title(['There are', num2str(numObjects),...
    'objects in the image!']);
hold off;