const enabledFeatures = {
  blogPostComments:
    process.env.GATSBY_ENABLE_FEATURE_COMMENTS_SECTION === 'true'
};

export default enabledFeatures;
