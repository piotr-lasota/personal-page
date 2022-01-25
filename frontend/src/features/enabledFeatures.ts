const enabledFeatures = {
  blogPostComments: process.env.ENABLE_FEATURE_COMMENTS_SECTION === 'true'
};

export default enabledFeatures;
