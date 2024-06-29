import {
  BlocksIcon,
  CogIcon,
  KeyboardIcon,
  PackageIcon,
  ShieldIcon,
  TreeDeciduousIcon,
} from 'lucide-react';
import { Highlight } from './Highlight/highlight';

export function Highlights(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border md:grid-cols-2 lg:grid-cols-3">
      <Highlight icon={TreeDeciduousIcon} heading="Tree shakable.">
        Only take what you really want and need.
      </Highlight>
      <Highlight icon={ShieldIcon} heading="Type strong.">
        Hooks are written in TypeScript, with full TS docs.
      </Highlight>
      <Highlight icon={KeyboardIcon} heading="Developer Experience.">
        Hooks are as easy to use as possible, everything is documented, there
        are examples and demos.
      </Highlight>
      <Highlight icon={PackageIcon} heading="Packages support.">
        ReactUse is available as a package for all major package managers.
      </Highlight>
      <Highlight icon={CogIcon} heading="Feature Rich.">
        100+ hooks for you to choose from.
      </Highlight>
      <Highlight icon={BlocksIcon} heading="Interactive demos.">
        Documentation of hooks also come with interactive demos.
      </Highlight>
    </div>
  );
}
