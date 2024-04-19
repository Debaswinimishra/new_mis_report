import Api from "../../../Environment/Api";

export const getChatbotReports = async (body) => {
  await Api.post(`WhateverApiForChatbot`, body);
};
