import api from '@/lib/api';// نفس axios اللي تستخدمه مع التوكن

// services/content.service.ts
export const getContents = async (page = 1) => {
  const res = await api.get(`/contents?page=${page}`);
  return res.data;
};

export const deleteContent = async (uuid: string) => {
  return api.delete(`/contents/${uuid}`);
};

export const togglePublish = async (uuid: string) => {
  return api.patch(`/contents/${uuid}/publish`);
};


export const createContent = async (data: any) => {
  const res = await api.post('/contents', data);
  return res.data;
};


// content.service.ts
export const updateContent = (uuid: string, data: FormData) => {
  return api.post(`/contents/${uuid}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

  });
};
 // services/content.service.ts

export async function getPublishedContents() {
   const res = await api.get("/published", {
    params: { status: "published" },
  });
   console.log("API Response:", res.data);
  return res.data;
 
  
};

export const getContent = async (uuid: string) => {
  return api.get(`/contents/${uuid}`);
};
