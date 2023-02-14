import React from "react";
import { Helmet } from "react-helmet";

// Properties
import properties from "properties.json";

const DocumentHead = () => {
  return (
    <Helmet>
      <link
        rel="icon"
        href={require(`assets/${properties.appearence.favicon}`)}
      />
      <meta name="theme-color" content={properties.appearence.primary} />
      <meta name="description" content={properties.app_info.description} />
      <link
        rel="apple-touch-icon"
        href={require(`assets/${properties.appearence.favicon}`)}
      />
      <title>{properties.app_info.name}</title>
    </Helmet>
  );
};

export default DocumentHead;
