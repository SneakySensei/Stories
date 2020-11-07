import React, { useState } from "react";

interface Tag {
  name: string;
  isSelected: boolean;
}

export const TagsContext = React.createContext({
  tags: [{}],
  setTags: (_tags: Tag[]) => {},
});

const TagsContextProvider: React.FC = (props) => {
  const [tags, setTags] = useState<Tag[]>([]);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {console.log(tags)}
      {props.children}
    </TagsContext.Provider>
  );
};

export default TagsContextProvider;
