import axios from "axios";
import qs from "qs";

export const handleDocumentDownload = async (serverUrl: any) => {
  try {
    let res = await axios.get("http://localhost:3001/doc/download", {
      params: { serverUrl },
      paramsSerializer: (params) => {
        return qs.stringify(params, { encode: false });
      },
      responseType: "blob",
    });
    const blob = new Blob([res.data]);
    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", serverUrl.split("/").pop() || "");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(error);
  }
};
