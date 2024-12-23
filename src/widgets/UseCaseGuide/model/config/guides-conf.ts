import { Guide } from "../type/guides";
import img1 from "../../../../shared/images/1.jpg";
import img2 from "../../../../shared/images/2.jpg";
import img3 from "../../../../shared/images/3.jpg";
import img4 from "../../../../shared/images/4.jpg";
import img5 from "../../../../shared/images/5.jpg";
import img6 from "../../../../shared/images/6.jpg";
import img7 from "../../../../shared/images/7.jpg";
import img8 from "../../../../shared/images/8.jpg";
import img9 from "../../../../shared/images/9.jpg";

export const GuidesConf: Guide[] = [
  {
    queue: 1,
    image: "",
    title: "Roles",
    description:
      "You`r role is User, father you can look guides for User role!",
  },
  {
    queue: 2,
    image: img1.src,
    title: "Profiles",
    description:
      "There are 2 profile concepts in the app, yours and someone else's. You can edit your own, but someone else's is only available for viewing, with the exception of some functions that we will consider further.",
  },
  {
    queue: 3,
    image: img2.src,
    title: "Edit your profile",
    description:
      "You can edit 3 main entities in your profile: Username, Avatar, and Documents confirming competence in the subject you want to teach.",
  },
  {
    queue: 4,
    image: img3.src,
    title: "Edit someone else's profile",
    description:
      "In someone else's profile, you can rate the user, and in the future, the user search will be performed in descending order by rating. A rating can only be given to a user with the ability to teach",
  },
  {
    queue: 5,
    image: img4.src,
    title: "Documents",
    description:
      "Documents can be added to any user, after adding, the record is sent to the administrator for verification, if the document is successfully verified, then now you can assign lessons by specifying this subject. ",
  },
  {
    queue: 6,
    image: img5.src,
    title: "Users",
    description:
      "The 'friends' tab shows your friends list by default, but the search takes into account all users of the platform, filtered by Name, Mail, Subject. Also, if the user also has them, they are sorted by the teacher's rating.",
  },
  {
    queue: 7,
    image: img6.src,
    title: "User actions",
    description:
      "While the user is not your friend, you can add him as a friend, view his profile, and see his friends list.",
  },
  {
    queue: 8,
    image: img7.src,
    title: "Notifications",
    description:
      "When adding friends, a request is sent to the user, and it is visible in notifications and when searching for users. Also, when you are assigned a lesson, an event message is shown in the notifications.",
  },
  {
    queue: 9,
    image: img8.src,
    title: "Friend actions",
    description:
      "If you have a user as a friend, you have the following options: Message to the user, Video call, delete a friend.",
  },
  {
    queue: 10,
    image: img9.src,
    title: "Lesson actions",
    description:
      "There are 2 possibilities for lessons: assign a lesson (if there is at least one confirmed subject and 1 added friend), view the list of scheduled lessons (search through various filters). To create a lesson, you must specify all the necessary fields: Date, Subject, Price, User.",
  },
];
