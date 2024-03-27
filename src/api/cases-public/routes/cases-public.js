module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/cases-public',
     handler: 'cases-public.findAll',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};