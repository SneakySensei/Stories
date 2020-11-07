import React, { useState } from "react";
import styled from "styled-components";

interface ModalProps {
  role: "seeker" | "supporter";
  submitTags: (tags: Tag[]) => void;
}

interface Tag {
  name: string;
  isSelected: boolean;
}

const Modal = (props: ModalProps) => {
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

  const onSubmitHandler = () => {
    props.submitTags(allTags);
  };

  return (
    <div className="fixed bg-black bg-opacity-50 w-screen h-screen grid place-items-center z-50">
      <div className="flex flex-col bg-background w-11/12 lg:w-5/12 p-4 rounded-lg">
        <h2 className="text-center text-2xl mb-2">
          What do you want to talk about?
        </h2>
        {allTags.map((tag) => (
          <div
            onClick={() => onToggleTag(tag.name)}
            key={tag.name}
            className={`rounded-md mb-2 px-4 py-2 shadow-card cursor-pointer select-none ${
              tag.isSelected ? "bg-primary text-background" : "bg-accent"
            }`}
          >
            {tag.name}
          </div>
        ))}
        <button onClick={onSubmitHandler}>submit</button>
      </div>
    </div>
  );
};

export default Modal;
