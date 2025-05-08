const cloud_name = "dhlwqdagp";

const upload_preset = "social-app";

const cloudUpload = async (file, fileType) => {
  if (file) {
    const data = new FormData();
    data.append("file", file);

    data.append("upload_preset", upload_preset);

    data.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      {
        method: "post",
        body: data,
      }
    );

    const formdata = await res.json();

    // console.log("Url : ", typeof formdata.secure_url);

    return formdata.secure_url;
  } else {
    console.log("Error...");
  }
};

export default cloudUpload;
