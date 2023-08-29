import { TutorialDay, TutorialInfo } from '../../interfaces/tutorial';
import { iterator, newColorGradient } from '../../lib/color-tools';
import globalStyles from '../../styles/globals.css';
import style from '../../styles/vanilla/tutorial.css';
import { Tutorial } from './tutorial';

interface TutorialListProps {
  tutorials: TutorialInfo[];
  schedule?: TutorialDay[];
  show: boolean;
}

export const TutorialList = ({
  tutorials,
  show,
  schedule
}: TutorialListProps) => {
  // Generate a gradient of colors between light and dark purple with one
  // color for each gradient. This list is passed to colorIterator, which returns
  // one color each time it's .next() method is called
  const colors = iterator(newColorGradient('#5E11A4', tutorials.length));

  // Left is first so that even tutorials (index % 2) will be on the left side
  const sides: ('left' | 'right')[] = ['left', 'right'];

  return show ? (
    <div
      id="tutorials"
      className={`${globalStyles.home.contentSpace} container-lg`}
    >
      <h2>Tutorials</h2>
      <div className={style.tutorialDay}>
        {
          // Right now we don't distinguish between morning and
          // afternoon tutorials, so we merge all the tutorials
          // together
          tutorials.map((tutorial, i) => (
            <Tutorial
              key={tutorial.id}
              config={tutorial}
              color={colors.next().value ?? ['#5E11A4', '#5E11A4']}
              side={sides[i % 2]}
            />
          ))
        }
      </div>
    </div>
  ) : null;
};