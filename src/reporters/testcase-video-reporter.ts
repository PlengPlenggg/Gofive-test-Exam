import fs from 'node:fs';
import path from 'node:path';
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

function safeFileName(value: string): string {
  return value.replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').trim();
}

class TestcaseVideoReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult): void {
    const pathAttachments = result.attachments.filter((attachment) => attachment.path);
    const firstAttachmentPath = pathAttachments[0]?.path;

    if (!firstAttachmentPath) return;

    const sourceDirectory = path.dirname(firstAttachmentPath);
    const currentDirectoryName = path.basename(sourceDirectory);
    const projectSuffix = currentDirectoryName.match(/-([^-]+)$/)?.[1] ?? 'result';
    const retrySuffix = result.retry > 0 ? `-retry-${result.retry}` : '';
    const targetDirectory = path.join(
      path.dirname(sourceDirectory),
      `${safeFileName(test.title)}-${projectSuffix}${retrySuffix}`,
    );

    if (sourceDirectory !== targetDirectory && !fs.existsSync(targetDirectory)) {
      fs.renameSync(sourceDirectory, targetDirectory);
    }

    for (const attachment of pathAttachments) {
      const sourcePath = attachment.path as string;
      attachment.path = path.join(targetDirectory, path.relative(sourceDirectory, sourcePath));
    }

    const videoAttachments = result.attachments.filter(
      (attachment) => attachment.name === 'video' && attachment.path,
    );

    for (const attachment of videoAttachments) {
      const sourcePath = attachment.path as string;
      const extension = path.extname(sourcePath) || '.webm';
      const targetPath = path.join(
        targetDirectory,
        `${safeFileName(test.title)}${extension}`,
      );

      if (sourcePath !== targetPath) {
        fs.renameSync(sourcePath, targetPath);
        attachment.path = targetPath;
      }
    }
  }
}

export default TestcaseVideoReporter;