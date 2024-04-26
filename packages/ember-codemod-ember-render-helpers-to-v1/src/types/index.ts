type CodemodOptions = {
  projectRoot: string;
  projectType: 'app' | 'v1-addon';
};

type Options = {
  projectRoot: string;
  src: string[];
};

export type { CodemodOptions, Options };
