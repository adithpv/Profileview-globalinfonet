import React from "react";

import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import UploadButton from "@rpldy/upload-button";
import UploadPreview, { PreviewComponentProps } from "@rpldy/upload-preview";

const CustomImagePreview = ({ id, url }: PreviewComponentProps) => {
  const { completed } = useItemProgressListener(id) || { completed: 0 };

  return <img src={url} height="100px" width="200px" alt="" />;
};

const UploadWithProgressPreview: React.FC = () => {
  return (
    <>
      <UploadButton>Upload Files</UploadButton>
      <br />
      <UploadPreview PreviewComponent={CustomImagePreview} />
    </>
  );
};

const mockSenderEnhancer = getMockSenderEnhancer({ delay: 1500 });

const FileUpload: React.FC = () => (
  <Uploady
    destination={{ url: "https://my-server.com/upload" }}
    enhancer={mockSenderEnhancer}
  >
    <div>
      <h1>Hello react Uploady</h1>
      <UploadWithProgressPreview />
    </div>
    <UploadButton />
  </Uploady>
);

export default FileUpload;
