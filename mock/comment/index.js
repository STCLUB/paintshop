export default {
  path: '/artwork/:id/comments',
  data: {
    code: 200,
    message: '请求成功',
    data: [
      {
        id: 'comment_001',
        user: {
          id: 'user_001',
          nickName: '插画爱好者',
          avatar: '/static/user-avatar.png',
        },
        content: '这幅画太美了！色彩搭配得很好',
        createTime: '2024-01-15 14:30',
      },
      {
        id: 'comment_002',
        user: {
          id: 'user_002',
          nickName: '艺术探索者',
          avatar: '/static/user-avatar2.png',
        },
        content: '请问这幅画是用什么软件画的？',
        createTime: '2024-01-15 15:20',
      },
      {
        id: 'comment_003',
        user: {
          id: 'user_003',
          nickName: '星空追梦人',
          avatar: '/static/user-avatar3.png',
        },
        content: '星空的细节处理得非常到位，学习了！',
        createTime: '2024-01-15 16:45',
      },
    ],
  },
};

export const commentSubmitMock = {
  path: '/artwork/:id/comments',
  method: 'POST',
  data: {
    code: 200,
    message: '评论成功',
    data: {
      id: 'comment_' + Date.now(),
    },
  },
};

export const likeMock = {
  path: '/artwork/:id/like',
  method: 'POST',
  data: {
    code: 200,
    message: '操作成功',
    data: {
      likeCount: 128,
    },
  },
};
