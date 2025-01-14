import { SEMATTRS_HTTP_URL } from '@opentelemetry/semantic-conventions';
import { SEMANTIC_ATTRIBUTE_URL_FULL, getClient, isSentryRequestUrl } from '@sentry/core';

import type { AbstractSpan } from '../types';
import { spanHasAttributes } from './spanTypes';

/**
 *
 * @param otelSpan Checks wheter a given OTEL Span is an http request to sentry.
 * @returns boolean
 */
export function isSentryRequestSpan(span: AbstractSpan): boolean {
  if (!spanHasAttributes(span)) {
    return false;
  }

  const { attributes } = span;

  const httpUrl = attributes[SEMATTRS_HTTP_URL] || attributes[SEMANTIC_ATTRIBUTE_URL_FULL];

  if (!httpUrl) {
    return false;
  }

  return isSentryRequestUrl(httpUrl.toString(), getClient());
}
