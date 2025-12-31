export default {
  path: '/artwork/list',
  data: {
    code: 200,
    message: '请求成功',
    data: [
      {
        id: 'artwork_001',
        title: '星空下的少年',
        description: '这是一幅描绘少年仰望星空的插画作品，充满了对未来的憧憬和梦想。',
        images: ['/static/home/card0.png'],
        tags: ['AI绘画', '版权素材', '星空'],
        category: 'AI绘画',
        author: {
          id: 'admin_001',
          name: '插画工坊',
          avatar: '/static/admin-avatar.png',
        },
        status: 'published',
        createTime: '2024-01-15 10:30',
        updateTime: '2024-01-15 10:30',
      },
      {
        id: 'artwork_002',
        title: '仰望星空的少女',
        description: '温柔的少女在星空下许愿，画面充满梦幻色彩。',
        images: ['/static/home/card1.png'],
        tags: ['AI绘画', '版权素材', '人物'],
        category: 'AI绘画',
        author: {
          id: 'admin_001',
          name: '插画工坊',
          avatar: '/static/admin-avatar.png',
        },
        status: 'published',
        createTime: '2024-01-14 15:20',
        updateTime: '2024-01-14 15:20',
      },
      {
        id: 'artwork_003',
        title: '多彩的天空',
        description: '色彩斑斓的天空，展现了大自然的美丽。',
        images: ['/static/home/card4.png'],
        tags: ['原创插画', '风景', '多彩'],
        category: '原创插画',
        author: {
          id: 'admin_001',
          name: '插画工坊',
          avatar: '/static/admin-avatar.png',
        },
        status: 'published',
        createTime: '2024-01-13 09:15',
        updateTime: '2024-01-13 09:15',
      },
      {
        id: 'artwork_004',
        title: '梦幻森林',
        description: '神秘的森林中，光影交错，充满奇幻色彩。',
        images: ['/static/home/card2.png'],
        tags: ['原创插画', '森林', '奇幻'],
        category: '原创插画',
        author: {
          id: 'admin_001',
          name: '插画工坊',
          avatar: '/static/admin-avatar.png',
        },
        status: 'published',
        createTime: '2024-01-12 14:45',
        updateTime: '2024-01-12 14:45',
      },
      {
        id: 'artwork_005',
        title: '少年与梦想',
        description: '追逐梦想的少年，永不放弃的精神。',
        images: ['/static/home/card3.png'],
        tags: ['AI绘画', '人物', '梦想'],
        category: 'AI绘画',
        author: {
          id: 'admin_001',
          name: '插画工坊',
          avatar: '/static/admin-avatar.png',
        },
        status: 'published',
        createTime: '2024-01-11 16:30',
        updateTime: '2024-01-11 16:30',
      },
    ],
  },
};

export const artworkDetailMock = {
  path: '/artwork/:id',
  data: {
    code: 200,
    message: '请求成功',
    data: {
      id: 'artwork_001',
      title: '星空下的少年',
      description: '这是一幅描绘少年仰望星空的插画作品，充满了对未来的憧憬和梦想。画面中，少年站在山丘之上，仰望满天繁星，眼中闪烁着对未来的期待和向往。星空璀璨，银河横跨天际，为整个画面增添了无尽的神秘和浪漫色彩。',
      images: ['/static/home/card0.png', '/static/home/card1.png'],
      tags: ['AI绘画', '版权素材', '星空', '梦想'],
      category: 'AI绘画',
      author: {
        id: 'admin_001',
        name: '插画工坊',
        avatar: '/static/admin-avatar.png',
      },
      status: 'published',
      createTime: '2024-01-15 10:30',
      updateTime: '2024-01-15 10:30',
    },
  },
};

export const artworkPublishMock = {
  path: '/artwork/publish',
  data: {
    code: 200,
    message: '发布成功',
    data: {
      id: 'artwork_' + Date.now(),
    },
  },
};

export const artworkDraftMock = {
  path: '/artwork/draft',
  data: {
    code: 200,
    message: '保存草稿成功',
    data: {
      id: 'artwork_' + Date.now(),
    },
  },
};
