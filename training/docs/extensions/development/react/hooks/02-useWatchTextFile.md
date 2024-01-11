---
sidebar_label: useWatchTextFile
---

# `useWatchTextFile()` Hook

The `useWatchTextFile()` hook allows you to read and write to the contents of a file at the provided `filePath`.

## Usage

```ts
import { useWatchTextFile } from '@replit/extensions-react';

const Component = () => {
  const { content, watching, watchError, writeChange } = useWatchTextFile({ filePath: "..." });

  ...
}
```

## Signature

```ts
function useWatchTextFile({
  filePath: string | null | undefined
}): UseWatchTextFileLoading | UseWatchTextFileErrorLike | UseWatchTextFileWatching;
```

## Result

| Property    | Type                        | Description                                                                       |
| ----------- | --------------------------- | --------------------------------------------------------------------------------- |
| status      | `UseWatchTextFileStatus`    | The file watcher's status. Useful for ensuring the desired file is being watched. |
| content     | `string` &#124; `null`      | If watching, the contents of the file located at the provided `filePath`          |
| watchError  | `string` &#124; `null`      | If an error occurs, the corresponding error message                               |
| writeChange | `WriteChange` &#124; `null` | If watching, a function to update the watched file                                |

## Types

### TextChange

| Property | Type     |
| -------- | -------- |
| from     | `number` |
| to?      | `number` |
| insert?  | `string` |

### UseWatchTextFileErrorLike

| Property    | Type                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| status      | `UseWatchTextFileStatus.Error` &#124; `UseWatchTextFileStatus.Moved` &#124; `UseWatchTextFileStatus.Deleted` |
| content     | `null`                                                                                                       |
| watchError  | `string` &#124; `null`                                                                                       |
| writeChange | `null`                                                                                                       |

### UseWatchTextFileLoading

| Property    | Type                             |
| ----------- | -------------------------------- |
| status      | `UseWatchTextFileStatus.Loading` |
| content     | `null`                           |
| watchError  | `null`                           |
| writeChange | `null`                           |

### UseWatchTextFileWatching

| Property    | Type                              |
| ----------- | --------------------------------- |
| status      | `UseWatchTextFileStatus.Watching` |
| content     | `string`                          |
| watchError  | `null`                            |
| writeChange | `WriteChange`                     |

---

## UseWatchTextFileStatus

```ts
Error = "error",
Loading = "loading",
Watching = "watching",
Moved = "moved",
Deleted = "deleted",
```

---

### WriteChange

```ts
(changes: TextChange | Array<TextChange>) => void
```
