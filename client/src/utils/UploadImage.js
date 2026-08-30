const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append(
    "upload_preset",
    "taskflow_profile_images"
  );

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/oymzqzhj/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Image upload failed"
    );
  }

  return data.secure_url;
};

export default uploadImage;