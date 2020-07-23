import Environment from '../config/Environment';

export async function getResultFromApi (picturePath) {
    // console.log(picturePath);
    try {
        let body = JSON.stringify({
          requests: [
            {
              features: [
                { type: "LABEL_DETECTION", maxResults: 5 },
                // { type: "LANDMARK_DETECTION", maxResults: 5 },
                // { type: "LOGO_DETECTION", maxResults: 5 },
                // { type: "TEXT_DETECTION", maxResults: 5 },
                // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                // { type: "IMAGE_PROPERTIES", maxResults: 5 },
                // { type: "CROP_HINTS", maxResults: 5 },
                // { type: "WEB_DETECTION", maxResults: 5 }
              ],
              image: {
                content: picturePath
              }
            }
          ]
        });
        let response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=" +
            Environment["GOOGLE_CLOUD_VISION_API_KEY"],
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: body
          }
        );
        let responseJson = await response.json();
        // console.log(responseJson);
        return responseJson;
      } catch (error) {
        console.log(error);
      }
  }