import Mock from './WxMock';
import loginMock from './login/index';
import homeMock from './home/index';
import searchMock from './search/index';
import dataCenter from './dataCenter/index';
import my from './my/index';
import authMock, { adminLoginMock } from './auth/index';
import artworkMock, {
  artworkDetailMock,
  artworkPublishMock,
  artworkDraftMock,
} from './artwork/index';
import commentMock, { commentSubmitMock, likeMock } from './comment/index';
import chatMock, { chatSendMock } from './chat/index';
import messageMock from './message/index';

export default () => {
  const mockData = [
    ...loginMock,
    ...homeMock,
    ...searchMock,
    ...dataCenter,
    ...my,
    authMock,
    adminLoginMock,
    artworkMock,
    artworkDetailMock,
    artworkPublishMock,
    artworkDraftMock,
    commentMock,
    commentSubmitMock,
    likeMock,
    chatMock,
    chatSendMock,
    messageMock,
  ];
  mockData.forEach((item) => {
    Mock.mock(item.path, { code: 200, success: true, data: item.data });
  });
};
