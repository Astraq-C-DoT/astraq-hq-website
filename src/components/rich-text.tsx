import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";
import { jsxConverter } from "@/components/converters/jsx-converter";
import { cn } from "@/lib/utils";

type Props = {
  data: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

export function RichText(props: Props) {
  const { className, ...rest } = props;

  return (
    <RichTextConverter
      {...rest}
      className={cn("prose dark:prose-invert", className)}
      converters={jsxConverter}
    />
  );
}
