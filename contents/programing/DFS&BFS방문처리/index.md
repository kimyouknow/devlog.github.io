---
date: '2023-06-25'
title: 'DFS & BFS는 왜 방문 처리 시점이 다를까?'
categories: ['알고리즘']
summary: '방문 처리 관련해서 습관적으로 외워서 풀었는데 이번 기회를 통해 BFS, DFS 탐색 과정을 구체적으로 이해할 수 있었습니다'
thumbnail: './overview.png'
---

백준 알고리즘 1939-g3-중량제한 문제를 풀면서 DFS, BFS 로직과 관련해서 헷갈리는 점이 있었습니다.

문제의 핵심은 DFS, BFS보다는 이진탐색을 떠올릴 수 있느냐였지만 문제 풀이 과정에서 DFS, BFS 구현을 잘못해서 다시 개념을 찾아봤습니다.

특히, 방문 처리 관련해서 습관적으로 외워서 풀었는데 이번 기회를 통해 BFS, DFS 탐색 과정을 구체적으로 이해할 수 있었습니다

## DFS, BFS 기본 개념

DFS와 BFS는 그래프 탐색 알고리즘의 두 가지 주요 접근 방식입니다.

### DFS

DFS는 깊이 우선 탐색이라고 부르며, 그래프에서 깊은 부분을 먼저 탐색하는 알고리즘입니다. 스택 또는 재귀적인 방식으로 구현할 수 있으며, 구체적인 동작은 아래와 같습니다.

1. 루트(탐색 시작) 노드를 스택에 넣고 방문 처리한다.
2. 스택 최상단 노드의 인접 노드 중 방문하지 않은 노드 하나를 스택에 넣고 방문 처리한다. 만약 인접 노드를 모두 방문한 경우 스택을 Pop 한다.
3. 2 단계를 더 이상 수행할 수 없을 때까지 (스택이 빌 때까지) 반복한다.

```jsx
function dfs(graph, v, visited) {
  // 현재 노드를 방문 처리
  visited[v] = true
  // 현재 노드와 연결된 다른 노드를 재귀적으로 방문
  for (let i = 0; i < graph[v].length; i++) {
    if (!visited[graph[v][i]]) {
      // 재귀적으로 함수 호출
      dfs(graph, graph[v][i], visited)
    }
  }
}
```

### BFS

BFS는 너비 우선 탐색이라고 부르며, 그래프에서 가까운 노드부터 먼저 탐색하는 알고리즘입니다. 큐 자료구조를 활용하며, 구체적인 동작은 아래와 같습니다.

1. 루트(탐색 시작) 노드를 큐에 넣고 방문 처리한다.
2. 큐를 Dequeue 하고, Dequeue 한 노드의 방문하지 않은 모든 인접 노드를 큐에 넣고 방문 처리한다.
3. 2 단계를 더 이상 수행할 수 없을 때까지 (큐가 빌 때까지) 반복한다.

```jsx
function bfs(graph, start, visited) {
  const queue = [start]
  // 현재 노드 방문 처리
  visited[start] = true
  // 큐가 빌 때까지 반복
  while (queue.length !== 0) {
    // 큐에서 하나씩 원소를 뽑아 출력
    const v = queue.shift()
    // 해당 원소와 연결된, 아직 방문하지 않은 원소들을 큐에 삽입
    for (let i = 0; i < graph[v].length; i++) {
      if (!visited[graph[v][i]]) {
        visited[graph[v][i]] = true
        queue.push(graph[v][i])
      }
    }
  }
}
```

### 방문 처리

DFS는 현재 노드를 방문하자마자 현재 노드와 연결된 다음 노드로 이동합니다. 그렇기 때문에 노드를 탐색하는 시점에 방문 처리가 이루어집니다.

```jsx
function dfs(graph, v, visited) {
  // 현재 노드를 방문 처리
  visited[v] = true
  // 생략
}
```

BFS는 현재 노드와 인접한 모든 노드를 방문한 후 그 노드들과 연결된 다음 노드를 탐색합니다. 그렇기 때문에 해당 노드가 큐에서 추출되어 실제로 탐색 되는 시점에 방문 처리가 이루어집니다.

```jsx
function bfs(graph, start, visited) {
  // 생략
  while (queue.length !== 0) {
    // 생략
    for (let i = 0; i < graph[v].length; i++) {
      if (!visited[graph[v][i]]) {
        visited[graph[v][i]] = true
        queue.push(graph[v][i])
      }
    }
  }
}
```

## 왜 방문 처리 시점이 다를까요?

### DFS에서 BFS처럼 노드를 추출하여 실제 탐색할 때 방문 처리를 하게 되면 문제가 발생할까요?

앞서 설명했듯이 DFS는 한 노드에서 출발하여 가능한 한 깊이 탐색을 진행하는 알고리즘입니다. DFS는 스택(Stack) 또는 재귀를 이용하여 구현되며, 방문 처리는 노드를 처음 탐색하는 시점에 이루어집니다.

만약 `DFS에서 노드를 추출하여 실제 탐색할 때 방문 처리를 하게 되면, 해당 노드을 여러 번 탐색하는 문제가 발생`합니다. DFS는 현재 노드과 연결된 다음 노드으로 이동하여 탐색하는데, 이미 방문 처리된 노드을 다시 탐색하게 되면 무한 루프에 빠질 수 있습니다. 이는 그래프 내에 순환 경로가 있는 경우 특히 문제가 될 수 있습니다.

```jsx
function dfs(graph, v, visited) {
  // 현재 노드와 연결된 다른 노드를 재귀적으로 방문
  for (let i = 0; i < graph[v].length; i++) {
    if (!visited[graph[v][i]]) {
      // 재귀적으로 함수 호출
      // 현재 노드를 방문 처리
      visited[v] = true // => 🚨 이렇게 하면 안 됨!
      dfs(graph, graph[v][i], visited)
    }
  }
}
```

### BFS에서 DFS처럼 방문 처리는 노드를 처음 탐색하는 시점에 이루어지면 문제가 발생할까요?

BFS(Breadth-First Search)는 큐(Queue)를 사용하여 구현되며, 현재 노드과 인접한 모든 노드들을 방문한 후에 그 노드들과 연결된 다음 노드들을 탐색합니다. BFS는 너비 우선 탐색을 수행하는 알고리즘이므로, 한 단계씩 진행하면서 해당 단계의 모든 노드들을 방문 처리해야 합니다.

만약 BFS에서 노드을 처음 탐색하는 시점에 방문 처리를 한다면, 현재 노드과 인접한 노드들을 모두 큐에 넣은 후에야 방문 처리가 이루어지게 됩니다. 이렇게 되면 `같은 단계에 속한 노드들이 큐에 중복해서 들어가게 되고, 불필요한 중복 탐색이 발생`합니다. 이는 BFS의 탐색 순서를 균일하게 유지하며 최단 경로를 찾는 목적에 맞지 않습니다.

```jsx
function bfs(graph, start, visited) {
  // 생략
  while (queue.length !== 0) {
    const v = queue.shift()
    visited[v] = true // => 🚨 이렇게 하면 안 됨!
    // 생략
    for (let i = 0; i < graph[v].length; i++) {
      if (!visited[graph[v][i]]) {
        queue.push(graph[v][i])
      }
    }
  }
}
```

따라서 BFS에서는 노드을 실제 탐색할 때 방문 처리를 해야 합니다. 즉, 큐에서 노드을 추출하여 탐색하기 직전에 방문 처리를 해주어야 합니다. 이렇게 함으로써 같은 단계에 속한 노드들이 중복해서 큐에 들어가지 않고, 각 노드은 한 번씩만 탐색 되도록 보장됩니다.

## 마무리

알고리즘은 풀다 보면 외워서 풀게 되는 부분이 있는데 가끔 이렇게 구체적인 동작 과정을 살펴보는 것도 좋다는 생각이 들었습니다.

## 참고 자료

- [https://sungone-develop-study.tistory.com/entry/DFS-와-BFS의-방문 처리-시점은-왜-다를까](https://sungone-develop-study.tistory.com/entry/DFS-%EC%99%80-BFS%EC%9D%98-%EB%B0%A9%EB%AC%B8%EC%B2%98%EB%A6%AC-%EC%8B%9C%EC%A0%90%EC%9D%80-%EC%99%9C-%EB%8B%A4%EB%A5%BC%EA%B9%8C)
- https://youtu.be/7C9RgOcvkvo
