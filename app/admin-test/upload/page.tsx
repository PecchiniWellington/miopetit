"use client";
import UploadFiles from "./upload-files";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadImage from "./upload-images";

const UploadPage = () => {
  return (
    <Tabs defaultValue="uploadImage" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger onClick={(e) => console.log(e.target)} value="uploadImage">
          UPLOAD IMAGE
        </TabsTrigger>
        <TabsTrigger value="uploadFile">UPLOAD FILE</TabsTrigger>
      </TabsList>
      <TabsContent value="uploadImage">
        <UploadImage />
      </TabsContent>
      <TabsContent value="uploadFile">
        <UploadFiles />
      </TabsContent>
    </Tabs>
  );
};
export default UploadPage;
