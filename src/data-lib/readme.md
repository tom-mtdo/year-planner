* Notes
** For components inside parents which generate id for children, like repeating group
- Dont pass in dataPath, compId, parentId, parentDataPath, parentUxPath, they will be ignored
- Need compName as parents use it to generate parentId, parentDataPath, parentUxPath