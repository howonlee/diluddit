// Directory of Subs.
// There is no mixing of reddits.
// The overall goal is to pretend it's 1999 and you're on a damn forum.
//
// TODO: un-hardcode listing. Maybe also don't shove like 70% of my sub preferences onto open internet

import _ from 'underscore';
import { Routes, Route, Link } from "react-router-dom";

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
  return <li>bloop {props.member}</li>;
}

function Directory() {
  const shuffledListing = _.sortBy(listing, (member) => Math.random());
  const listingDiv = shuffledListing.map(
    (member) => <DirectoryMember member={member} />);
  return (
    <div className="Directory">
    <ul>{listingDiv}</ul>
    </div>
  );
}

export default Directory;
