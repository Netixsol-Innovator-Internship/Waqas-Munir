"use client";

import imageCompression from "browser-image-compression";

import { List } from "lucide-react";
import { Toggle } from "./ui/toggle";
import {
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
} from "lucide-react";
import { ListOrdered } from "lucide-react";

export default function ToolBar({ editor }: { editor: any }) {
  if (!editor) return null;
  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 400,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();

        reader.onloadend = () => {
          const imageUrl = reader.result as string;

          editor.chain().focus().setImage({ src: imageUrl }).run();
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    };
  };

  const Options = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <Upload className="size-4" />,
      onClick: () => addImage(),
      pressed: editor.isActive("image"),
    },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1  space-x-1 ">
      {Options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
