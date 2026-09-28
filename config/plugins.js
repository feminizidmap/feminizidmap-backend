module.exports = ({ env }) => ({
  ferry: {
    enabled: true,
    config: {
      exclude: ['api::invoice.invoice'],
    },
  },
});
