// Directory of Subreddits.
// There is no mixing of reddits.
// The overall goal is to pretend it's 1999 and you're on a damn forum.
//
// TODO: un-hardcode listing. Maybe also don't shove like 70% of my sub preferences onto open internet

import { DelayedLink } from "./DelayedLink";

const listing = [
  "accounting",
  "argentina",
  "artisanvideos",
  "askculinary",
  "askhistorians",
  "askmen",
  "askprogramming",
  "askreddit",
  "askwomen",
  "bestoflegaladvice",
  "books",
  "britishproblems",
  "buttcoin",
  "clojure",
  "comics",
  "construction",
  "consulting",
  "curatedtumblr",
  "designdesign",
  "experienceddevs",
  "fire",
  "gardening",
  "historiansanswered",
  "hobbydrama",
  "kitchenconfidential",
  "korea",
  "machinelearning",
  "medicine",
  "mexico",
  "nonpoliticaltwitter",
  "programming",
  "rebubble",
  "sales",
  "showerthoughts",
  "specializedtools",
  "subredditdrama",
  "totalwar",
  "warcollege"
];

function DirectoryMember(props) {
  const url = `/r/${props.member}`;
  return <DelayedLink to={url}>{props.member}</DelayedLink>
}

function Directory() {
  const listingDiv = listing.map(
    (member) => <div key={member}> <DirectoryMember member={member} /></div>);
  return (
    <div className="Directory">
      {listingDiv}
    </div>
  );
}

export default Directory;
