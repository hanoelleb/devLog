import { randomUUID } from "crypto";
import { NavBar } from "../page";
import { AppProps } from "next/app";

type BlogProps = {
  title: string;
  content: string;
  date: Date;
};

const Post = ({ title, content, date }: BlogProps) => {
  return (
    <>
      <h2>{title}</h2>
      <h3>{date.toDateString()}</h3>
      <p>{content}</p>
    </>
  );
};

export default function Blog() {
  const postLimit = 3;

  const testPosts = [
    { title: "Post 1", content: "Lorem Ipsum", date: new Date() },
    { title: "Post 2", content: "Lorem Ipsum", date: new Date() },
  ];

  return (
    <>
      <NavBar></NavBar>
      <h1>Melostead Blog</h1>
      <div>
        {testPosts.map((post) => {
          return (
            <Post
              title={post.title}
              content={post.content}
              date={post.date}
              key={randomUUID()}
            ></Post>
          );
        })}
      </div>
    </>
  );
}
