const data = {
    date:new Date(),
    pkg:{
        name: 'lm',
        description:'lm eg',
        homepage: 'www.minliu.com',
        author:{
            url:'www.minliu.com',
            name:'min.liu'
        }
    },
    menus: [
        {
          name: 'Home',
          icon: 'aperture',
          link: 'index.html'
        },
        {
          name: 'Features',
          link: 'features.html'
        },
        {
          name: 'About',
          link: 'about.html'
        },
        {
          name: 'Contact',
          link: '#',
          children: [
            {
              name: 'Twitter',
              link: 'https://twitter.com/w_zce'
            },
            {
              name: 'About',
              link: 'https://weibo.com/zceme'
            },
            {
              name: 'divider'
            },
            {
              name: 'About',
              link: 'https://github.com/zce'
            }
          ]
        }
      ],
}
module.exports = data