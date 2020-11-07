import React, { useState, useContext } from "react";

import { TagsContext } from "../../context/tagsContext";

interface ModalProps {
  role: "seeker" | "supporter";
  submitTags: () => void;
  onModalClose: () => void;
}

interface Tag {
  name: string;
  isSelected: boolean;
}

const humanReadableTagNames = [
  "Suicidal Thoughts",
  "Relationship Advice",
  "Family Issues",
  "Substance Abuse",
  "Gender and Sexual Indentity",
  "Anxious and Depressive Thoughts",
  "Academic Issues",
];

const Modal = (props: ModalProps) => {
  const tagsContext = useContext(TagsContext);

  const tags: Tag[] = [
    { name: "suicide-prevention", isSelected: false },
    { name: "relationship-advice", isSelected: false },
    { name: "family-issues", isSelected: false },
    { name: "substance-abuse", isSelected: false },
    { name: "gender-sexual-identity", isSelected: false },
    { name: "anxious-depressive-thoughts", isSelected: false },
    { name: "academic-issues", isSelected: false },
  ];

  const [allTags, setAllTags] = useState<Tag[]>(tags);

  const onToggleTag = (tagName: string) => {
    setAllTags(
      allTags.map((tag) => {
        if (tag.name === tagName) {
          tag.isSelected = !tag.isSelected;
        }
        return tag;
      })
    );
  };

  const onSubmitHandler = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    props.submitTags();
    tagsContext.setTags(allTags);
  };

  return (
    <div
      className="fixed bg-black bg-opacity-50 w-screen h-screen grid place-items-center z-50"
      onClick={props.onModalClose}
    >
      <div
        className="flex flex-col bg-background w-11/12 lg:w-5/12 p-4 rounded-lg"
        onClick={(evt: React.MouseEvent) => {
          evt.stopPropagation();
        }}
      >
        <h2 className="text-center text-2xl mb-2">
          What do you want to talk about?
        </h2>
        {allTags.map((tag, index) => (
          <div
            onClick={(evt: React.MouseEvent) => {
              evt.stopPropagation();
              onToggleTag(tag.name);
            }}
            key={tag.name}
            className={`rounded-md mb-2 px-4 py-2 shadow-card cursor-pointer select-none ${
              tag.isSelected ? "bg-primary text-background" : "bg-accent"
            }`}
          >
            {humanReadableTagNames[index]}
          </div>
        ))}
        <button
          className="bg-secondary px-4 py-2 rounded-lg text-background font-bold self-center hover:bg-secondaryAccent"
          onClick={onSubmitHandler}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Modal;
