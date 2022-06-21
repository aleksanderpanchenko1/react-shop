import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 464"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="138" cy="141" r="130" />
    <rect x="0" y="296" rx="14" ry="14" width="280" height="32" />
    <rect x="0" y="338" rx="11" ry="11" width="280" height="88" />
    <rect x="1" y="432" rx="3" ry="3" width="127" height="42" />
    <rect x="124" y="449" rx="0" ry="0" width="0" height="1" />
    <rect x="148" y="431" rx="3" ry="3" width="127" height="42" />
  </ContentLoader>
);

export default Skeleton;
