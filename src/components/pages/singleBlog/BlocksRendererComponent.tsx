"use client";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import styles from "./singleBlog.module.scss";

interface BlocksRendererComponentProps {
  content: BlocksContent;
}

const BlocksRendererComponent: React.FC<BlocksRendererComponentProps> = ({
  content,
}) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        // You can use the default components to set class names...
        paragraph: ({ children }) => (
          <p className={styles.blog__para}>{children}</p>
        ),
        image: ({ image, children, plainText }) => {
          console.log("Im", image);
          console.log("Ch", children);
          console.log("PT", plainText);
          return (
            <Image
              width={500}
              height={300}
              src={image.url}
              alt={image.alternativeText || "Blog Image"}
              className={styles.blog__insideImg}
            />
          );
        },
        list: ({ children }) => {
          console.log("List", children);
          return (
            <ul className={styles.blog__ul}>
              <li className={styles.blog__li}>{children}</li>
            </ul>
          );
        },

        // ...or point to a design system
      }}
    />
  );
};

export default BlocksRendererComponent;
