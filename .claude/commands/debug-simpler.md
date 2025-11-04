# Debug (Simplified)

This guide helps debug issues during manual testing or implementation by investigating logs and git history, without editing files.

## Initial Response

When invoked WITH a plan/ticket file:
```
I'll help debug issues with [file name]. Let me understand the current state.

What specific problem are you encountering?
- What were you trying to test/implement?
- What went wrong?
- Any error messages?

I'll investigate logs and git state to help figure out what's happening.
```

When invoked WITHOUT parameters:
```
I'll help debug your current issue.

Please describe what's going wrong:
- What are you working on?
- What specific problem occurred?
- When did it last work?

I can investigate logs and recent changes to help identify the issue.
```

## Environment Information

You have access to these typical locations and tools for local development:

**Logs**:
- Local dev: your terminal output or a local log file (e.g., `./logs/app.log`)

**Git State**:
- Branch, recent commits, uncommitted changes

**Service Status**:
- Local dev: running process (`npm run dev`, `node server.js`)

**Environment variables (local)**:
- `DEBUG=*` — enable verbose debug output for libraries using debug
- `LOG_LEVEL=debug` — set application logger to debug level
- `NODE_OPTIONS=--trace-warnings` — show stack traces for warnings

## Process Steps

### Step 1: Understand the Problem

After the user describes the issue:

1. Read any provided context (plan or ticket file)
2. Quick state check:
   - Current git branch and recent commits
   - Any uncommitted changes
   - When the issue started occurring

### Step 2: Investigate the Issue

Spawn parallel tasks for efficient investigation:

```
Task 1 - Check Recent Logs:
Find and analyze the most recent logs for errors.
Local commands:

- Log file: tail -n 200 ./logs/app.log | sed -n '1,200p'
- Terminal: reproduce and capture output

Look for stack traces, repeated errors, and timestamps around the incident.
Return: Key errors/warnings with timestamps.
```

```
Task 2 - Git and File State:
Understand what changed recently.

1. git status
2. git log --oneline -10
3. git diff
4. Verify expected files exist
5. Check file permissions if relevant

Return: Git state and any file issues.
```

### Step 3: Present Findings

Based on the investigation, present a focused debug report:

```markdown
## Debug Report

### What's Wrong
[Clear statement of the issue based on evidence]

### Evidence Found

**From Logs**:
- [Error/warning with timestamp]
- [Pattern or repeated issue]

**From Git/Files**:
- [Recent changes that might be related]
- [File state issues]

### Root Cause
[Most likely explanation based on evidence]

### Next Steps

1. **Try This First**:
   ```bash
   [Specific command or action]
   ```

2. **If That Doesn't Work**:
   - Restart local dev server/process
   - Check browser console for frontend errors
   - Increase logging or enable debug flags

### Can't Access?
Some issues might be outside this guide's reach:
- Browser console errors (F12 in browser)
- Application server internal state
- System-level issues

Would you like me to investigate something specific further?
```

## Important Notes

- Focus on manual testing scenarios
- Always require a problem description
- Read files completely when reviewing context
- Think like a PR reviewer: understand git state and changes
- No file editing from this guide — pure investigation only

## Quick Reference

**Logs**:
```bash
tail -n 200 ./logs/app.log
```

**Service Check**:
```bash
ps aux | grep node
```

**Git State**:
```bash
git status
git log --oneline -10
git diff
```

**Environment variables (local)**:
```bash
# Linux/macOS (temporary for current shell)
export DEBUG="*"
export LOG_LEVEL="debug"
export NODE_OPTIONS="--trace-warnings"

# Prefix a single run
DEBUG="*" LOG_LEVEL="debug" NODE_OPTIONS="--trace-warnings" npm run dev
```


