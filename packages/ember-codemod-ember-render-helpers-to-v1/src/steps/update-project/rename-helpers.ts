import { AST } from '@codemod-utils/ast-template';

const helpers = {
  'did-insert': 'did-insert-helper',
  'did-update': 'did-update-helper',
  'will-destroy': 'will-destroy-helper',
} as const;

export function renameHelpers(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    MustacheStatement(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      const oldName = node.path.original;

      switch (oldName) {
        case 'did-insert':
        case 'did-update':
        case 'will-destroy': {
          node.path.original = helpers[oldName];

          break;
        }
      }
    },

    SubExpression(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      const oldName = node.path.original;

      switch (oldName) {
        case 'did-insert':
        case 'did-update':
        case 'will-destroy': {
          node.path.original = helpers[oldName];

          break;
        }
      }
    },
  });

  return AST.print(ast);
}
