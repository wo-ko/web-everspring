import PatternP from '@app/components/pattern-p';
import { ILayoutProp } from '@app/types/context';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const displayComponentPattern = (item: ILayoutProp, content: any) => {
  switch (item.pattern) {
    case 'img':
      return (
        <div className='flex justify-center'>
          <img  src={content[item.img as keyof typeof content]} />
        </div>
      )
    case 'text-bold':
      return <p className="font-bold">{content[item.text as keyof typeof content]}</p>;
    case 'p':
      return <PatternP text={content[item.text as keyof typeof content]} />
  }
}