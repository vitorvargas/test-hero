import Home from "./screens/Home";
import Questions from "./screens/Questions";
import Results from "./screens/Results";

export const routes = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Questions',
    path: '/questions',
    element: <Questions /> 
  },
  {
    name: 'Results',
    path: '/results',
    element: <Results />
  }
];