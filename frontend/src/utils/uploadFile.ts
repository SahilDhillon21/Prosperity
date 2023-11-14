import axios from "axios"

export const uploadFile = async (file: File, uploadPreset: string) => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', uploadPreset)

    try {
        let cloudName = process.env.REACT_APP_CLOUD_NAME
        console.log("cloud name: " + cloudName);

        let resource_type = 'image'
        let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resource_type}/upload`

        const response = await axios.post(api, data)
        const { secure_url } = response.data

        console.log(secure_url);

        return secure_url

    } catch (error) {
        console.log(error)
    }
}