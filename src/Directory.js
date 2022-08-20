// Directory of Subs.
// There is no mixing of reddits.
// The overall goal is to pretend it's 1999 and you're on a damn forum.
//
// TODO: un-hardcode listing. Maybe also don't shove like 70% of my sub preferences onto open internet

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

function Directory() {
  const listingDiv = listing.map((member) => <li>{member}</li>);
  return (
    <div className="Directory">
    <ul>{listingDiv}</ul>
    </div>
  );
}

export default Directory;
