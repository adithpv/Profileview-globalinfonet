import React, { useEffect, useState } from "react";

import { AiOutlineFolderOpen, AiOutlineUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { HiDownload, HiOutlineTrash } from "react-icons/hi";
import axios from "axios";
import { useParams } from "react-router-dom";

import style from "../styles/document.module.css";

const Documents = () => {
  const [document, setDocument] = useState<any>({});
  const [fetchDocument, setFetchDocument] = useState<any>();
  const { id } = useParams();
  const formdata = new FormData();
  formdata.append("filename", document);

  const handleDocument = (e: any) => {
    setDocument(e.target.files[0]);
  };

  const documentUpload = async (e: any) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `http://localhost:3001/doc/${id}`,
        formdata
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getDocuments = async () => {
      try {
        let response = await axios.get(`http://localhost:3001/doc/${id}`);
        setFetchDocument(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDocuments();
  }, []);

  return (
    <section className={style["document__wrapper"]}>
      <section className={style["fileUpload"]}>
        <div className={style["fileUpload__wrapper"]}>
          <div className={style["fileUpload__title"]}>
            <h3>Add new file</h3>
          </div>

          <div className={style["fileUpload-container"]}>
            <label htmlFor="fileUpload" className={style["fileUpload__label"]}>
              Click to upload file
              <AiOutlineUpload />
              <input
                type="file"
                id="fileUpload"
                className={style["fileUpload__input"]}
                onChange={handleDocument}
              />
              <button onClick={documentUpload}>Submit</button>
            </label>
          </div>
        </div>
      </section>

      <div className={style["fileUpload__docvault"]}>
        <div className={style["docvault__wrapper"]}>
          <ul className={style["docvault__list"]}>
            {fetchDocument?.map((file: any) => (
              <>
                <li className={style["docvault__items"]}>
                  <div className={style["docvault__filename"]}>
                    <AiOutlineFolderOpen /> {file.Name}
                  </div>

                  <div className={style["docvault__items-btns"]}>
                    <button className={style["downloadBtn"]}>
                      <HiDownload />
                    </button>
                    <button className="deleteBtn">
                      <HiOutlineTrash />
                    </button>
                  </div>
                </li>
                <hr />
              </>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Documents;
