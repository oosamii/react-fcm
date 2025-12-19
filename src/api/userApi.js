import axios from "axios";

export const updateFcmToken = async ({ userId, fcmToken }) => {
  try {
    const { data } = await axios.post(
      "https://salmara.uur.co.in:4170/api/user/updateFcm",
      {
        userId,
        fcmToken,
      }
    );

    return data;
  } catch (error) {
    console.error("FCM API Error:", error.response?.data || error.message);
    throw error;
  }
};
