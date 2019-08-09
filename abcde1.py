import math
import sys
import csv
global h,dis,parent,vis
from queue import PriorityQueue
h=[]
dis=[]
parent=[]
vis=[]

class node:
     def __init__(self,edge,we):
          self.edge=edge
          self.we=we


def initialize(s,n,ind):
     for i in range(n):
          dis.append(100000000000000000000000000000000000000000)
          vis.append(False)
          parent.append(-1)
     dis[ind[s]]=0
     parent[ind[s]]=0

def astar(graph,s,n,m,city,ind):
     initialize(s,n,ind)
     pq=PriorityQueue()
     pq.put((dis[ind[s]]+h[ind[s]],s))
     while not pq.empty():
          u=pq.get()[1]
          if not vis[ind[u]]:
               for j in [graph[u]]:
                    for i in range(len(j)):
                         e=graph[u][i].edge
                         if graph[u][i].we<150:
                              if dis[ind[e]] > dis[ind[u]]+graph[u][i].we:
                                   parent[ind[e]]=u
                                   dis[ind[e]]=dis[ind[u]]+graph[u][i].we
                              pq.put((dis[ind[e]]+h[ind[e]],e))
          vis[ind[u]]=True

                         
def main():
     pollutant={"co":[1,0.25,0.25,0.25,0.125,0.0625],"no2":[0.0025,1,0.0025,0.0025,0.0025,0.00125],"so2":[0.0025,0.0025,1,0.0025,0.0025,0.00125],"o3":[0.0025,0.0025,0.0025,1,0.00125,0.00625],"pm2.5":[0.00125,0.00125,0.0025,0.00125,1,0.0025],"pm10":[0.00625,0.00125,0.00125,0.00625,0.0025,1]}
     index={"co":0,"no2":1,"so2":2,"o3":3,"pm2.5":4,"pm10":5}
     n=94
     city=[]

     with open(r'''C:\Users\shubh\Desktop\Minor_Project\WeBreatheLife\text1.csv''') as csv_file:
          csv_reader = csv.reader(csv_file, delimiter=',')
          for row in csv_reader:
               city.append(row[0])

          
     ind={}
     for i in range(len(city)):
          ind[city[i]]=i
     v={}
     for i in city:
          v[i]=[]

     with open(r'''C:\Users\shubh\Desktop\Minor_Project\WeBreatheLife\text1.csv''') as csv_file:
          csv_reader1 = csv.reader(csv_file, delimiter=',')
          for row_r in csv_reader1:
               la = float(row_r[1])
               lo = float(row_r[2])
               a_r = row_r[3]
               a_r = 100 - int(a_r)
               aqi = int(a_r)
               po=row_r[4]
               v[row_r[0]].append(la)
               v[row_r[0]].append(lo)
               v[row_r[0]].append(aqi)
               v[row_r[0]].append(po)

     #print(v)          

     m=4465
     graph={}
     for i in city:
          graph[i]=[]
     source=sys.argv[1]
     destination=sys.argv[2]
     lon2=math.radians(v[destination][1])
     lat2=math.radians(v[destination][0])
     poll=str(sys.argv[3])
     #print(poll)


     with open(r'''C:\Users\shubh\Desktop\Minor_Project\WeBreatheLife\dis1.csv''') as csv_file:
          csv_reader2 = csv.reader(csv_file, delimiter=',')
          k_i=93
          l_i=2
          m_i=0
          flag_i = 0
          for row_i in csv_reader2:
               if(flag_i==0):
                    flag_i=1
                    li_i = []
                    li_i = row_i
                    continue
               if(k_i==0):
                    break
               for j_i in range(k_i):
                    a = row_i[0]
                    b = li_i[l_i+m_i]
                    rd = float(row_i[l_i+m_i])
                    m_i += 1
                    if b!=destination:
                         weight1=(rd)+5*(v[b][2]/100)+25*pollutant[poll][index[v[b][3]]]
                    else:
                         weight1=(rd)
                    if a!=destination:     
                         weight2=(rd)+5*(v[a][2]/100)+25*pollutant[poll][index[v[a][3]]]
                    else:
                         weight2=(rd)
                         
                    n1=node(b,weight1)
                    n2=node(a,weight2)
                    graph[a].append(n1)
                    graph[b].append(n2)
               k_i -= 1
               l_i += 1
               m_i=0
          
     for i in city:
          for j in [graph[i]]:
               j.sort(key=lambda x: x.we)
               
     #print(graph['Adilabad'][0].edge)
     
     for i in city:
          lon1=math.radians(v[i][1])
          lat1=math.radians(v[i][0])
          dlon=lon2-lon1
          dlat=lat2-lat1
          a=math.pow((math.sin(dlat/2)),2) + math.cos(lat1)*math.cos(lat2)*math.pow((math.sin(dlon/2)),2)
          c=2*math.atan2(math.sqrt(a),math.sqrt(1-a))
          d=6373*c
          h.append(d)
       
     astar(graph,source,n,m,city,ind)
   
     '''for i in range(n):
          print(city[i]," : ",dis[i])'''
     
     st=[]
     nod=destination
     while parent[ind[nod]]:
          st.append(nod)
          nod=parent[ind[nod]]
          
     #st.append(source)
     #print(source,end=" ")
     '''while len(st):
          print(st.pop(),end=" ")'''

     st1=[]
     for i in range(len(st)-1,0,-1):
          st1.append(st[i])
     #st1.append(destination)
     latitude=[]
     longitude=[]
     
     for i in st1:
          latitude.append(v[i][0])
          longitude.append(v[i][1])
     
     '''for i in st1:
          print(i,end=" ")'''
     print(st1)
     st1.clear()
     '''print()
     for i in range(len(latitude)):
          print(latitude[i]," ",longitude[i])'''
    
        
main()        
